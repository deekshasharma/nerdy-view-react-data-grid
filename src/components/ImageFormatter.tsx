import styled from "styled-components";

const ImageDisplay = styled.div`
  background: #efefef;
  background-size: 100%;
  display: inline-block;
  height: 28px;
  width: 28px;
  vertical-align: middle;
  background-position: center;
`;

interface Props {
  value: string;
}

export function ImageFormatter({ value }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around"
      }}
    >
      <ImageDisplay style={{ backgroundImage: `url(${value})` }} />
    </div>
  );
}
