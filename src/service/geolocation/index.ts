import { GeolocationReturnType, GeolocationError } from "react-native";
import log from '@czarsimon/remotelogger';
import { Coordinate } from "@src/types";

export function getPosition(): Promise<Coordinate> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationReturnType) => resolve(createPosition(position)),
      (error: GeolocationError) => {
        log.error(`geolocation.index.getPosition. Error=${error.message}`);
        reject("Failed to get position.");
      }
    );
  })
};

function createPosition(position: GeolocationReturnType): Coordinate {
  const { latitude, longitude } = position.coords;
  return { latitude, longitude };
}
