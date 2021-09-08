import Loader from "react-loader-spinner";

export function LoadingData(){
    return (
        <Loader
            type="ThreeDots"
            color="#41464b"
            height={100}
            width={100}
            timeout={3000}
      />
    )
}