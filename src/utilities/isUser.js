import { getSession } from "./session";

const isUser = () => {
    const session = getSession();
    return session === "user";
};

export default isUser;
