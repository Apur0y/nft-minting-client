import { useEffect, useState } from "react";
import { RiBox2Line } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import {
  useConnect,
  useAccount,
  useWriteContract,
  useChainId,
  useSwitchChain,
  useReadContract,
} from "wagmi";
import { injected } from "wagmi";
import { sepolia } from "viem/chains";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Contract configuration
const contractConfig = {
  address: "0x743f49311a82fe72eb474c44e78da2a6e0ae951c",
  abi: [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "checkId",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getApproved",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "operator", type: "address" },
      ],
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "string", name: "metadataUrl", type: "string" },
      ],
      name: "mint",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "ownerOf",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "bytes", name: "data", type: "bytes" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

const API_URL = "http://localhost:5000"; // Adjust according to your backend URL

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const { connectAsync } = useConnect();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();

  const [tokenId, setTokenId] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successful, setSuccessful] = useState(false);

  // Generate random ID between 1 and 1,000,000
  const generateRandomId = () => Math.floor(Math.random() * 1000000) + 1;

  // Check if the token ID exists
  const { data: exists, refetch } = useReadContract({
    ...contractConfig,
    functionName: "checkId",
    args: [tokenId],
    enabled: !!tokenId,
  });

  // Find a unique token ID on initial load
  useEffect(() => {
    if (isChecking && tokenId === null) {
      const newId = generateRandomId();
      setTokenId(newId);
    }
  }, [isChecking, tokenId]);

  // Check if generated ID exists and generate a new one if needed
  useEffect(() => {
    if (tokenId !== null && exists !== undefined) {
      if (exists === true) {
        // ID exists, generate a new one
        console.log(
          `Token ID ${tokenId} already exists, generating new one...`
        );
        setTokenId(generateRandomId());
        refetch(); // Re-check the new ID
      } else {
        // Unique ID found
        console.log(`Found unique token ID: ${tokenId}`);
        setIsChecking(false);
      }
    }
  }, [tokenId, exists, refetch]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnother =()=>{
    setIsChecking(false)
    setIsSubmitting(false)
    setSuccessful(false);
    setFormData({
      name: "",
    description: "",
    image: "",

    })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => {
     
    }, 3000); 
    setSuccessful(true)
    
    if (!formData.name) {
      toast.error("Please enter a name for your NFT");
     
    }

    setIsSubmitting(true);

    try {
      // Step 1: Make sure we're connected
      if (!address) {
        try {
          await connectAsync({
            connector: injected(),
          });
        } catch (error) {
          toast.error("Failed to connect wallet");
          console.error("Connection error:", error);
          setIsSubmitting(false);
       
        }
      }

      
      if (chainId !== sepolia.id) {
        try {
          await switchChainAsync({ chainId: sepolia.id });

          // Wait for chain switch to take effect
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Verify chain switch
          if (window.ethereum) {
            const currentChainId = await window.ethereum.request({
              method: "eth_chainId",
            });
            if (parseInt(currentChainId, 16) !== sepolia.id) {
              throw new Error("Failed to switch to Sepolia network");
            }
          }

          toast.success("Switched to Sepolia Network!");
        } catch (error) {
          toast.error(
            "Please switch to Sepolia network manually in your wallet"
          );
          console.error("Network switch failed:", error);
          setIsSubmitting(false);
         
        }
      }

      // Step 3: Prepare metadata
      const metadata = {
        tokenId,
        name: formData.name,
        description: formData.description || "",
        image: formData.image || "",
        owner: address,
      };

      // Step 4: Store metadata in backend
      try {
        await axios.post(`http://localhost:5000/alldata`, metadata)
         .then(()=>{
          
         })
         ;
        console.log("Metadata stored successfully");
      } catch (error) {
        toast.error("Failed to store NFT metadata");
        console.error("Metadata storage error:", error);
        setIsSubmitting(false);
        return;
      }

      // Step 5: Prepare metadata URL for the contract
      const metadataUrl = `${API_URL}/alldata/${tokenId}`;

      // Step 6: Call the contract to mint the NFT
      try {
        const tx = await writeContractAsync({
          address: contractConfig.address,
          abi: contractConfig.abi,
          functionName: "mint",
          args: ["0x8738e1ea64ea97cfb734e7655258b1415aea9eeb1bb2a57127d47146ba1657c7",tokenId, metadataUrl],
          chainId: sepolia.id,
        });

        toast.success("NFT minted successfully!");
        console.log("Transaction:", tx);

        // Reset form after successful mint
        setFormData({
          name: "",
          description: "",
          image: "",
        });

        // Generate new token ID for next mint
        // setIsChecking(true);
        setTokenId(null);
      } catch (error) {
        toast.error("Failed to mint NFT");
        console.error("Mint error:", error);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {successful ? (
        <>
          <div className="border border-green-600 w-[500px] mx-auto rounded-lg">
          <div className="my-5">
          <TiTick className="text-green-500 mx-auto size-8 border border-green-500 rounded-full"/>
            <h1 className="text-xl font-semibold text-center">NFT Minted Successfully</h1>
            <p className="text-center">Your NFT has been created and added to your collection.</p>
          </div>
            <div className="card bg-base-100 mx-5 mb-4 shadow-sm">
              <figure>
                <img
                  src={formData?.image || "https://dyebikr0297u5.cloudfront.net/NFT_Interoperability_6ed94a06cf.jpg"}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{formData?.name || "Name"} </h2>
                <p>
                  {
                    formData?.description || "Description"
                  }
                </p>
              
              </div>
            </div>

            <div className="flex justify-center w-full gap-5 my-5">
              <button className="btn w-2/5 bg-gray-900">Share</button>
              <button onClick={handleAnother} className="btn w-2/5 bg-gradient-to-l  to-pink-500 from-purple-500">Mint Another</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
                <div className="card-body w-96">
                  <h1 className="text-2xl font-semibold">Mint Your NFT</h1>
                  <form onSubmit={handleSubmit}>
                    <fieldset
                      className="fieldset"
                      disabled={isSubmitting || isChecking}
                    >
                      <label className="fieldset-label">NFT Name</label>
                      <input
                        type="text"
                        name="name"
                        className="input"
                        placeholder="Enter Your NFT Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />

                      <label className="fieldset-label">Description</label>
                      <input
                        type="text"
                        name="description"
                        className="input"
                        placeholder="Describe Your NFT"
                        value={formData.description}
                        onChange={handleChange}
                      />

                      <label className="fieldset-label">Image URL</label>
                      <input
                        type="url"
                        name="image"
                        className="input"
                        placeholder="Enter Image URL"
                        value={formData.image}
                        onChange={handleChange}
                      />

                      <button
                        type="submit"
                        className="btn btn-neutral bg-gradient-to-l to-pink-500 from-purple-500 mt-4 flex items-center"
                        disabled={isSubmitting || isChecking}
                      >
                        {isSubmitting ? (
                          <span>Minting...</span>
                        ) : isChecking ? (
                          <span>Preparing...</span>
                        ) : (
                          <>
                            <RiBox2Line className="text-white mr-2" /> Mint NFT
                          </>
                        )}
                      </button>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
            <ToastContainer position="bottom-right" />
          </div>
        </>
      )}
    </div>
  );
};

export default Form;
