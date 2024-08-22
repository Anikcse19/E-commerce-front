import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RequireAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const router = useRouter();

    const user = Cookies.get("user");
    // Simulate authentication check
    const isAuthenticated = user; // Replace with your authentication logic

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/Auth/Login"); // Redirect to login page if not authenticated
      }
    }, [isAuthenticated, router]);

    // Render the wrapped component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return ComponentWithAuth;
};

export default RequireAuth;
