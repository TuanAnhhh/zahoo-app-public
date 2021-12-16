export const imageShow = (src) => {
  return (
    <img src={src} alt="images" style={{ width: "50px", height: "50px" }} />
  );
};

export const videoShow = (src) => {
  return (
    <video
      controls
      src={src}
      alt="video"
      style={{ width: "50px", height: "50px" }}
    />
  );
};

export const fileShow = (src, item) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: ".5rem",
        borderRadius: ".5rem",
      }}
    >
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        {item.name}
      </a>
    </div>
  );
};
