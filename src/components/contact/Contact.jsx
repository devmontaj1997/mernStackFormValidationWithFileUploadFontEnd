/* eslint-disable react/no-unescaped-entities */
// import { FaEnvelopeOpenText } from "react-icons/fa6";
// import { LuMapPin } from "react-icons/lu";
// import { ImHeadphones } from "react-icons/im";
import FormManage from "../../hooks/formManagehook/formManage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useRef } from "react";

import { useSelector } from "react-redux";

import createTost from "../../utils/reactTostify";
import {
  formValidationSelector,
  setEmtyMessage,
} from "../../feature/formValidation/formValidationSlice";
import { createUserDataApiSlice } from "../../feature/formValidation/formValidationAPISlice.js";
import { uniqUserDataApiSlice } from "../../feature/formValidation/formValidationAPISlice.js";

const Contact = () => {
  // useSelector
  const { uniqUserData, error, message, loader } = useSelector(
    formValidationSelector
  );

  // files

  const [singleFile, setSingleFile] = useState(null);
  const [multipleFile, setmultipleFile] = useState([]);
  // Refs to directly access the file inputs
  const singleFileInputRef = useRef(null);
  const multipleFileInputRef = useRef(null);

  // dispatch

  const dispatch = useDispatch();

  const { input, handleSetInput, formReset } = FormManage({
    name: "",
    email: "",
    phone: "",
    textArea: "",
    compuerParts: [],
    degitalServices: "",
  });
  const { input: search, handleSetInput: shandleSetInput } = FormManage({
    searchEmail: "",
  });
  const [checkbox, setCheckBox] = useState([]);

  const handleInputCheckBox = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setCheckBox([...checkbox, value]);
    } else {
      setCheckBox(checkbox.filter((item) => item !== value));
    }
  };

  const handleOnsubmit = (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();

    // Append multiple files (gallery)
    for (let i = 0; i < multipleFile.length; i++) {
      formData.append("gallery", multipleFile[i]); // 'gallery' is the key for the file array
    }

    // Append other fields to the FormData
    formData.append("compuerParts", checkbox); // Example for checkbox data
    formData.append("photo", singleFile); // Example for single file

    // If you have other text data, append them as well
    for (let key in input) {
      formData.append(key, input[key]); // Dynamically append text fields from input object
    }

    // Dispatch the action or make an API call
    dispatch(createUserDataApiSlice(formData));
  };

  const handleOnsubmitSearch = (e) => {
    e.preventDefault();
    dispatch(uniqUserDataApiSlice(search));
  };
  useEffect(() => {
    if (message) {
      createTost(message, "success");
      dispatch(setEmtyMessage());
      formReset();
      setCheckBox([]);
      setSingleFile(null);
      setmultipleFile([]);
      // Clear the actual file input fields
      if (singleFileInputRef.current) {
        singleFileInputRef.current.value = ""; // Reset single file input
      }
      if (multipleFileInputRef.current) {
        multipleFileInputRef.current.value = ""; // Reset multiple file input
      }
    }
    if (error) {
      createTost(error);
      dispatch(setEmtyMessage());
    }
  }, [message, error, dispatch, formReset]);

  return (
    <>
      <div className="mainDiv bg-[#050709] py-10">
        <div className="container">
          <div className="contactSection m-auto  ">
            <div className="parentDiv xl:grid grid-cols-[60%_40%] xxxsm:gap-8 lg:gap-10 ">
              <div className="leftSide  bg-[#140C1C] xl:p-14 sm:p-16 xxxsm:p-6 rounded-2xl   ">
                <div className="textAre">
                  <h1 className="lg:text-4xl xxxsm:text-xl font-bold bg-gradient-to-r from-[#8750f7] to-white bg-clip-text text-transparent mb-6 ">
                    Here I'm covering some necessary form fields
                  </h1>
                  <p className=" text-[#948e8e] text-lg">
                    It's all about the humans behind a brand and those
                    experiencing it, br we're right there. In the middle
                    performance quick.
                  </p>
                </div>

                <form action="" onSubmit={handleOnsubmit}>
                  <div className="formArea mt-10 ">
                    <div className="mb-5 ">
                      <input
                        name="name"
                        value={input.name}
                        onChange={handleSetInput}
                        type="text"
                        className="w-full text-white bg-transparent border-[1px] border-[#6666667b] px-3 py-3 rounded-lg "
                        placeholder="Name*"
                      />
                    </div>
                    <div className="mb-5">
                      <input
                        className="w-[48%] text-white bg-transparent border-[1px] border-[#6666667b] px-5 py-3 rounded-lg "
                        type="text"
                        placeholder="Email*"
                        name="email"
                        value={input.email}
                        onChange={handleSetInput}
                      />
                      <input
                        className="w-[48%]  ml-[4%] text-white bg-transparent border-[1px] border-[#6666667b] px-5 py-3 rounded-lg "
                        type="text"
                        placeholder="Enter Phone"
                        name="phone"
                        value={input.phone}
                        onChange={handleSetInput}
                      />
                    </div>
                    <div>
                      <select
                        value={input.degitalServices}
                        onChange={handleSetInput}
                        name="degitalServices"
                        className="w-full text-white bg-transparent border-[1px] border-[#6666667b] px-3 py-3 rounded-lg "
                      >
                        <option value="" className="text-black ">
                          —Please choose an option—
                        </option>
                        <option value="Dell" className="text-black ">
                          Dell
                        </option>
                        <option value="Samsung" className="text-black ">
                          Samsung
                        </option>
                        <option value="Redmi" className="text-black ">
                          Redmi
                        </option>
                        <option value="Hp" className="text-black ">
                          Hp
                        </option>
                      </select>
                    </div>
                    <div className="w-full mt-5 text-white bg-transparent border-[1px] border-[#6666667b] px-3 py-3 rounded-lg ">
                      <div>
                        <input
                          type="checkbox"
                          id="ram"
                          name="compuerParts"
                          value="Ram"
                          onChange={handleInputCheckBox}
                          checked={checkbox.includes("Ram")} // Control checked state
                        />
                        <label htmlFor="ram">Ram</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="motherboard"
                          name="compuerParts"
                          value="Motherboard"
                          onChange={handleInputCheckBox}
                          checked={checkbox.includes("Motherboard")} // Control checked state
                        />
                        <label htmlFor="motherboard">Motherboard</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="ssd"
                          name="compuerParts"
                          value="Ssd"
                          onChange={handleInputCheckBox}
                          checked={checkbox.includes("Ssd")} // Control checked state
                        />
                        <label htmlFor="ssd">Ssd</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="i5-processor"
                          name="compuerParts"
                          value="i5 processor"
                          onChange={handleInputCheckBox}
                          checked={checkbox.includes("i5 processor")} // Control checked state
                        />
                        <label htmlFor="i5-processor">i5 processor</label>
                      </div>
                    </div>

                    <div className="mt-5 ">
                      <input
                        name="photo"
                        ref={singleFileInputRef}
                        onChange={(e) => setSingleFile(e.target.files[0])}
                        type="file"
                        className="w-full text-white bg-transparent border-[1px] border-[#6666667b] px-3 py-3 rounded-lg "
                        placeholder="Name*"
                      />
                    </div>
                    <div className="mt-5 w-8/12 ">
                      {singleFile && (
                        <>
                          {" "}
                          <img
                            id="image-result"
                            className="w-100 h-100"
                            src={URL.createObjectURL(singleFile)}
                            alt="avatar"
                          />
                        </>
                      )}
                    </div>
                    <div className="mt-5 ">
                      <input
                        name="gallery"
                        ref={multipleFileInputRef}
                        onChange={(e) => setmultipleFile([...e.target.files])}
                        multiple
                        type="file"
                        className="w-full text-white bg-transparent border-[1px] border-[#6666667b] px-3 py-3 rounded-lg "
                      />
                    </div>
                    {multipleFile.length > 0 && (
                      <div className="flex flex-wrap gap-4 mt-5">
                        {multipleFile.map((file, index) => (
                          <div key={index} className="w-1/3 mb-4">
                            <img
                              className="w-full h-full object-cover"
                              src={URL.createObjectURL(file)}
                              alt={`preview-${index}`}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div>
                      <textarea
                        value={input.textArea}
                        onChange={handleSetInput}
                        name="textArea"
                        className="w-full mt-5 h-[200px] text-white bg-transparent border-[1px] border-[#6666667b] px-5 py-3 rounded-lg "
                        placeholder="Write SomeThing Here *"
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className=" bg-gradient-to-r  bg-[#8750f7]  text-white mt-5 rounded-[80px] lg:w-[35%] lg:py-2 lg:text-lg xsm:text-md xxxsm:w-[60%] xsm:py-2"
                      >
                        {loader ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="rightSide  xsm:p-3 xxxsm:p-2  ">
                <div className="searchArea">
                  <h1 className="text-white mb-3">
                    Search Your Submitted Data
                  </h1>
                  <form action="">
                    <div className="mb-5 ">
                      <input
                        name="searchEmail"
                        value={search.searchEmail}
                        onChange={shandleSetInput}
                        type="text"
                        className=" w-full text-white bg-transparent border-[1px] border-[#6666667b] px-3 py-3 rounded-lg "
                        placeholder="Enter Email"
                      />
                    </div>
                    <button
                      type="submit"
                      onClick={handleOnsubmitSearch}
                      className=" p-3  bg-[#8750f7]  text-white mt-1 rounded-[80px]  lg:py-1 lg:text-lg xsm:text-md xsm:py-1"
                    >
                      {loader ? "Searching..." : "Search"}
                    </button>
                  </form>
                </div>

                {uniqUserData && (
                  <div className="showData bg-white p-2 border-2  mt-5 border-[#8750f7] rounded-lg shadow-lg">
                    <h1 className="font-bold mx-2">
                      Name:
                      <span className="text-lime-700 ">
                        {uniqUserData?.name}{" "}
                      </span>
                    </h1>
                    <h1 className="font-bold mx-2">
                      Email:
                      <span className="text-lime-700 sm:text-xl xxxsm:text-[12px]">
                        {uniqUserData?.email}
                      </span>
                    </h1>
                    <h1 className="font-bold mx-2">
                      Phone:
                      <span className="text-lime-700">
                        {uniqUserData?.phone}
                      </span>
                    </h1>
                    <h1 className="font-bold mx-2">
                      Your Text:
                      <p className="text-lime-700">{uniqUserData?.textArea}</p>
                    </h1>
                    <h1 className="font-bold mx-2">
                      CompuerParts:
                      <span className="text-lime-700">
                        {uniqUserData?.compuerParts?.map((item) => {
                          return (
                            <li className="text-lime-700" key={item}>
                              {item}
                            </li>
                          );
                        })}
                      </span>
                    </h1>
                    <h1 className="font-bold mx-2">
                      DegitalServices:
                      <span className="text-lime-700">
                        {uniqUserData?.degitalServices}
                      </span>
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
