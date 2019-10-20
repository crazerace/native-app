import React from "react";
import { useDispatch } from "react-redux";
import { Navigation } from "@src/types";
import { logOut } from "../../../state/user";
import LogoutButton from "../components/LogoutButton";
import { useTexts } from "../../../state/hooks";

interface Props {
  navigation: Navigation
};

export default function LogoutContainer(props: Props) {
  const texts = useTexts();
  const gotoLogin = () => { props.navigation.navigate("Auth") };
  const dispatch = useDispatch();
  const logoutUser = () => dispatch(logOut(gotoLogin));

  return (
    <LogoutButton
      text={texts("LOGOUT_BUTTON")}
      logOut={logoutUser}
    />
  );
};
