import react from "react";

function ImageGalleryItem({ image }) {
  return (
    <li className="ImageGalleryItem">
      <img src={image.webformatURL} alt="" className="ImageGalleryItem-image" />
    </li>
  );
}

export default ImageGalleryItem;
