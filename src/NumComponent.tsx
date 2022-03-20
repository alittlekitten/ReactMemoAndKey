import React from "react";

const NumComponent = (props: any) => {
  console.log(`새로 만들어지는 친구 : ${props.x}`);
  return <div>{props.x}</div>;
};

export default React.memo(NumComponent);
