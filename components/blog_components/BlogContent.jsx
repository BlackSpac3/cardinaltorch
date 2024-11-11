const Img = ({ url, caption }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <img src={url} />
      {caption && (
        <p className="w-full text-center my-3 text-base text-gray-500">
          {caption}
        </p>
      )}
    </div>
  );
};

const List = ({ style, items }) => {
  if (style == "ordered") {
    return (
      <ol>
        {items.map((listItem, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: listItem }}></li>
        ))}
      </ol>
    );
  }
  return (
    <ul>
      {items.map((listItem, index) => (
        <li key={index} dangerouslySetInnerHTML={{ __html: listItem }}></li>
      ))}
    </ul>
  );
};

const BlogContent = ({ block }) => {
  const { type, data } = block;

  if (type == "paragraph") {
    return <p dangerouslySetInnerHTML={{ __html: data.text }}></p>;
  }
  if (type == "header") {
    if (data.level == 3) {
      return <h3 dangerouslySetInnerHTML={{ __html: data.text }}></h3>;
    }
    return <h2 dangerouslySetInnerHTML={{ __html: data.text }}></h2>;
  }
  if (type == "image") {
    return <Img url={data.file.url} caption={data.caption} />;
  }
  if (type == "list") {
    return <List style={data.style} items={data.items} />;
  }
};
export default BlogContent;
