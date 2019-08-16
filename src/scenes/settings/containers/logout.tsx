import React from "react";
import { useDispatch } from "react-redux";
import { TextGetter, Navigation } from "@src/types";
import { logOut } from "../../../state/user";
import LogoutButton from "../components/logoutButton";

interface Props {
    navigation: Navigation
    texts: TextGetter
};

export default function LogoutContainer(props: Props) {
    const gotoLogin = () => { props.navigation.navigate("Auth") };
    const dispatch = useDispatch();
    const logoutUser = () => dispatch(logOut(gotoLogin));

    return <LogoutButton text={props.texts("LOGOUT_BUTTON")} logOut={logoutUser} />
};
