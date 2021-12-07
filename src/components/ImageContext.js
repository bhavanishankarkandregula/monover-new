import React, { createContext, useContext, useState } from "react";

export const ImageContext = createContext();

export const ImageProvider = (props) => {
  
  const [image, setImage] = useState({
    profileImg: "https://us.123rf.com/450wm/nexusby/nexusby1805/nexusby180500076/100911331-stock-vector-default-avatar-photo-placeholder-profile-picture.jpg?ver=6"
  });
  return (
    <ImageContext.Provider value={[image, setImage]}>
      {props.children}
    </ImageContext.Provider>
  );
};
