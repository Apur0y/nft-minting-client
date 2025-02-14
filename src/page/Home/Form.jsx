// import axios from "axios";
import { useState } from "react";
import { RiBox2Line } from "react-icons/ri";
import { useConnect, useAccount, useWriteContract,useNetwork,useSwitchNetwork } from "wagmi";
import { injected } from "wagmi";
import { sepolia } from "viem/chains";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const { connectAsync } = useConnect();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const {chain} = useNetwork()
  const {switchNetwork} = useSwitchNetwork()

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chain?.id !== sepolia.id) {
        if (switchNetwork) {
          switchNetwork(sepolia.id);
          return;
        } else {
          alert("Please switch to the Sepolia network manually.");
          return;
        }
      }
    if (!address) {
      await connectAsync({ chainId: sepolia.id, connector: injected() });
    }

    const data = await writeContractAsync({
        chainId: sepolia.id,
        address: "0x743f49311a82fe72eb474c44e78da2a6e0ae951c", // Contract Address
        abi: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"checkId","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"metadataUrl","type":"string"}],"name":"mint","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}],
        functionName: "transferFrom", // Use a valid function
        args: [address, "0x64498163f2b3E5AA871d335F4CBA6d5b5DcdD6BA", 1],
         // sender, receiver, tokenId
      });
      

    // axios.post("http://localhost:5000/alldata",formData)
    // .then(res=>console.log(res.data))
console.log(data);
    console.log("NFT Data:", formData);
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
    </div>
  );
};

export default Form;
