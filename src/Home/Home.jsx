import React, { useState, useEffect } from "react";
import carouselImgLight from "../components/images/bg-desktop-light.jpg";
import carouselImgDark from "../components/images/bg-desktop-dark.jpg";
import Box from "@mui/joy/Box";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userdata, setUserdata] = useState({
    data: [],
  });
  const [fetchLength, setFetchLength] = useState("");
  const [fetchData, setFetchData] = useState([""]);
  const [isActive, setIsActive] = useState("active");
  const [setActive, setSetActive] = useState("all");
  const [isChecked, setIsChecked] = useState(false);
  const [filterData, setFilterData] = useState([""]);

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeColor = isDarkMode ? "#c4c4c4" : "#012247";
  const themeColor2 = isDarkMode ? "#000" : "#ffffff";
  const themeColor3 = isDarkMode ? "#d4d4d4" : "#000";

  console.log("fetchData", fetchData?.data?.length);

  useEffect(() => {
    setFetchLength(fetchData?.data?.length);
  }, [fetchData?.data]);

  const handleChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };

  const handleSendData = async () => {
    console.log("userdata.text", userdata.text);
    if (
      userdata.text === "" ||
      userdata.text === null ||
      userdata.text === undefined
    ) {
      notifyError("Please filled this field");
    } else {
      const newUuid = uuidv4();
      const newDataFetch = {
        text: userdata.text,
        id: newUuid,
        active: isActive,
      };
      const updatedNewData = {
        ...userdata,
        data: [...userdata.data, newDataFetch],
      };
      localStorage.setItem("userdata", JSON.stringify(updatedNewData));
      notifySuccess("Add Successfully!");
      setUserdata(updatedNewData);
      console.log(updatedNewData);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userdata");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFetchData(parsedData);
      setFilterData(parsedData?.data);
    }
    console.log("storedData", storedData);
  }, [userdata]);

  const deleteEntry = (id) => {
    console.log("id", id);
    const updatedData = filterData?.filter((item) => item.id !== id);
    const updatedUserdata = { ...userdata, data: updatedData };
    setUserdata(updatedUserdata);
    notifySuccess("Record has been Successfully Deleted");
    localStorage.setItem("userdata", JSON.stringify(updatedUserdata));
  };

  const clearAll = () => {
    console.log("fetchData?.length", fetchData?.length);
    if (fetchData?.length === 1) {
      notifyError("No Records found");
    } else {
      setUserdata({
        text: "",
        data: [],
      });
      setFetchData([""]);
      localStorage.setItem("userdata", "");
      localStorage.removeItem("userdata");
      notifySuccess("All Record has been Successfully Cleared");
    }
  };

  const handleActiveSet = (status) => {
    setSetActive(status);
  };

  // const handleActiveSet = (status) => {
  //   setSetActive(status);
  //   let updatedData;
  //   if (status === "active") {
  //     updatedData = userdata?.data?.filter((item) => item.active === "active");
  //   } else if (status === "complete") {
  //     updatedData = userdata?.data?.filter(
  //       (item) => item.active === "complete"
  //     );
  //   } else {
  //     updatedData = userdata;
  //   }
  //   setUserdata(updatedData);
  // };

  useEffect(() => {
    handleActiveSet(setActive);
  }, [setActive]);

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
    setIsActive(isChecked ? "active" : "complete");
  };

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  return (
    <Box>
      <ToastContainer />
      <Box className="imgCon">
        {isDarkMode ? (
          <img
            src={carouselImgLight}
            alt="carousel"
            className="carousel-light"
            width={"100%"}
          />
        ) : (
          <img
            src={carouselImgDark}
            alt="carousel"
            className="carousel-dark"
            width={"100%"}
          />
        )}
      </Box>
      <Box
        sx={{ width: "100%", backgroundColor: themeColor3, height: "100vh" }}
      >
        <Container
          className="topCon"
          maxWidth="sm"
          sx={{ marginTop: "-160px" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h1 style={{ color: themeColor2 }}>TODO Website</h1>
            <Box
              onClick={handleDarkMode}
              sx={{ marginTop: "20px", cursor: "pointer" }}
            >
              {isDarkMode ? (
                <DarkModeIcon sx={{ fontSize: "30px" }} />
              ) : (
                <LightModeIcon sx={{ color: "white", fontSize: "30px" }} />
              )}
            </Box>
          </Box>
          {/* <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
         >
          <TextField fullWidth label="fullWidth" id="fullWidth" />
        </Box> */}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              name="text"
              value={userdata.text}
              onChange={handleChange}
              sx={{
                maxHeight: "120px",
                width: "100%",
                "& input": {
                  backgroundColor: themeColor,
                  color: themeColor2,
                  borderRadius: "7px",
                  padding: "13px",
                },
              }}
              id="input-with-icon-textfield"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      backgroundColor: themeColor,
                      height: "unset",
                      marginRight: "0px",
                      padding: "10px",
                      borderRadius: "7px",
                    }}
                  >
                    <Checkbox
                      checked={isChecked}
                      onClick={handleCheckbox}
                      sx={{
                        color: "#7a7a7a",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <Button
              onClick={handleSendData}
              sx={{ marginLeft: "10px" }}
              variant="contained"
            >
              Send
            </Button>
          </Box>
          <Box sx={{ backgroundColor: themeColor, marginTop: "35px" }}>
            {fetchData?.data
              ?.filter((item) => {
                if (setActive === "active") {
                  return item.active === setActive;
                } else if (setActive === "complete") {
                  return item.active === setActive;
                } else return item;
              })
              .map((item, index) => (
                <Box
                  key={item.id}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Checkbox
                      checked={item.active === "active" ? false : true}
                      sx={{
                        color: "#7a7a7a",
                      }}
                    />
                    <p style={{ color: themeColor2 }}>{item.text}</p>
                  </Box>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteEntry(item.id)}
                  >
                    <CloseIcon
                      sx={{
                        color: themeColor2,
                        fontSize: "25px",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                    />
                  </div>
                </Box>
              ))}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              <p style={{ color: themeColor2 }}>
                {fetchLength ? fetchLength : 0} items left
              </p>
              <Box sx={{ display: "flex" }}>
                <p
                  onClick={() => handleActiveSet("all")}
                  style={{
                    color: setActive === "all" ? "blue" : themeColor2,
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  All
                </p>
                <p
                  onClick={() => handleActiveSet("active")}
                  style={{
                    color: setActive === "active" ? "blue" : themeColor2,
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                >
                  Active
                </p>
                <p
                  onClick={() => handleActiveSet("complete")}
                  style={{
                    color: setActive === "complete" ? "blue" : themeColor2,
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                >
                  Complate
                </p>
              </Box>
              <Box>
                <p
                  onClick={clearAll}
                  style={{ color: themeColor2, cursor: "pointer" }}
                >
                  Clear
                </p>
              </Box>
            </Box>
          </Box>
        </Container>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default Home;
