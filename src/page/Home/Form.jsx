// import axios from "axios";
import { useEffect, useState } from "react";
import { RiBox2Line } from "react-icons/ri";
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
import { contractConfig } from "../../component/contractConfig";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const { connectAsync } = useConnect();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { chainId } = useChainId();
  const { switchChain } = useSwitchChain();

  const [tokenId, setTokenId] = useState(null);
  const [isChecking, setIsChecking] = useState(true); // Track loading state
  const metadata = {
    tokenId,
    name: formData.name,
    description: formData.description, // Add this
    image: formData.image,
  };
  

  // Generate random ID
  const generateRandomId = () => Math.floor(Math.random() * 1000000);

  // Check if the token ID exists
  const { data: exists, refetch } = useReadContract({
    ...contractConfig,
    functionName: "checkId",
    args: [tokenId], // Pass the current tokenId
    enabled: !!tokenId, // Only run if tokenId is set
  });

  useEffect(() => {
    if (isChecking) {
      const newId = generateRandomId();
      setTokenId(newId);
    }
  }, [isChecking]); // Runs when checking starts

  useEffect(() => {
    if (tokenId !== null && exists !== undefined) {
      if (exists) {
        // ID exists, generate a new one
        setTokenId(generateRandomId());
        refetch(); // Re-check the new ID
      } else {
        // Unique ID found
        setIsChecking(false);
      }
    }
  }, [tokenId, exists]);
 

  const switchNetwork = async () => {
    try {
      await switchChain({ chainId: sepolia.id });
      toast("Switched to Sepolia Network!");
    } catch (error) {
      console.error("Network switch failed:", error);
      alert("Failed to switch network. Please switch manually.");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chainId !== sepolia.id) {
      if (switchNetwork) {
        switchNetwork();
     
      } else {
        toast("Please switch to the Sepolia network manually.");
      
      }
    }
    if (!address) {
      await connectAsync({ chainId: sepolia.id, connector: injected() });
    }
    const metadataUrl = `http://localhost:5000/alldata/${tokenId}`;
    const data = await writeContractAsync({
      chainId: sepolia.id,
      address: "0x743f49311a82fe72eb474c44e78da2a6e0ae951c", // Contract Address
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
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "checkId",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
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
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
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
          inputs: [
            { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
          ],
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
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
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
      functionName: "mint", // Use a valid function
      args: [tokenId, metadataUrl],
      // sender, receiver, tokenId
    });
    

    axios
      .post("http://localhost:5000/alldata", metadata)
      .then((res) =>
         console.log(res.data));
    console.log(data);
   
  };

  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
          <div className="card-body w-96">
            <h1 className="text-2xl font-semibold">Mint Your NFT</h1>
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
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
                >
                  <RiBox2Line className="text-white mr-2" /> Mint NFT
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Form;
