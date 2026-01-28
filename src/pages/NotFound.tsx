import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import type { NotFoundProps } from "../types";

function NotFound({ isAuthenticated }: NotFoundProps) {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          type="primary"
          onClick={() => (isAuthenticated ? navigate("/") : navigate("/login"))}
        >
          Back Home
        </Button>
      }
    />
  );
}

export default NotFound;
