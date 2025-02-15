import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import axios from "axios";

// const API_URL = "https://nft-minting-server.vercel.app/alldata"; // Adjust according to your backend URL
const DEFAULT_IMAGE = "https://placehold.co/300x300?text=No+Image"; // Default image placeholder

const NFTGallery = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { address } = useAccount();


  useEffect(() => {
    const fetchNFTs = async () => {
      if (!address) {
        setLoading(false);
        return;
      }

      try {
        axios.get("https://nft-minting-server.vercel.app/alldata")
        .then(response => {
          const filteredNFTs = response.data.filter(nft => nft.owner === address);
          setNfts(filteredNFTs || []);
          console.log(filteredNFTs); // Only NFTs that match the owner address
        })
        .catch(error => console.error("Error fetching NFTs:", error));
        
      } catch (error) {
        console.error("Failed to fetch NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [address]);

  const handleImageError = (e) => {
    e.target.src = DEFAULT_IMAGE;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="text-center py-10">
        <p className="text-lg">Please connect your wallet to see your NFT gallery</p>
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg">No NFTs found, please mint your first one using the widget above</p>
      </div>
    );
  }

  // Function to chunk array into groups of 3 for layout
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const nftRows = chunkArray(nfts, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your NFT Gallery</h2>
      
      {nftRows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {row.map((nft) => (
            <div key={nft.tokenId} className="card bg-base-100 shadow-xl">
              <figure className="px-6 pt-6">
                <img
                  src={nft.image || DEFAULT_IMAGE}
                  alt={nft.name}
                  className="rounded-xl object-cover h-48 w-full"
                  onError={handleImageError}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{nft.name}</h2>
                <p className="text-sm text-gray-600 line-clamp-3">{nft.description || "No description"}</p>
                <div className="card-actions justify-end mt-2">
                  <div className="badge badge-outline">#{nft.tokenId}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NFTGallery;