import { useHistory } from "react-router-dom";

function LoginPageFooter() {
  const history = useHistory();

  return (
    <>
      <center>
        <h5>
          Don't have an account?{" "}
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push("/registration");
            }}
          >
            Signup
          </button>
        </h5>
      </center>
    </>
  );
};

export default LoginPageFooter;
