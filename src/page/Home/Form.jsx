import axios from "axios";
import { useState } from "react";
import { RiBox2Line } from "react-icons/ri";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/alldata",formData)
    .then(res=>console.log(res.data))

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
