import styled from "styled-components";
import { useMemo } from "react";
import colors from "modules/colors";

const ArticleHeader = ({ className, content, tagName }) => {

  const header = useMemo(() => {
    switch (tagName) {
      case "h1":
        return <h1>{content}</h1>;
      case "h2":
        return <h2>{content}</h2>;
      case "h3":
        return <h3>{content}</h3>;
      default:
        return <p>{content}</p>;
    }
  }, [tagName])

  return (
    <div className={`${className} ArticleHeader`}>
      <div></div>
      {header}
    </div>
  );
};

const getFontSize = (tagName) => {
  switch (tagName) {
    case "h1":
      return "1.8rem";
    case "h2":
      return "1.5rem";
    case "h3":
      return "1.2rem";
    default:
      return "1rem";
  }
};

const StyledArticleHeader = styled(ArticleHeader)`
display: grid; /* displayをflexからgridに変更 */
align-items: center;
grid-template-columns: min-content 1fr; /* 最初の列には必要最低限のスペースを、2つ目の列には残りのスペースを割り当てます */
gap: 0.5rem;

div:first-child {
  height: 90%; /* heightを100%に設定 */
  width: 0.5rem;
  border-radius: 0.25rem;
  background-color: ${colors.main};
}

> *:last-child {
  line-height: ${({tagName}) => {return(getFontSize(tagName))}};
}

`;

StyledArticleHeader.defaultProps = {
  tagName: "h1",
  showPointLabel: true,
};

export default StyledArticleHeader;



