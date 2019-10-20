//import AsyncStorage from '@react-native-community/async-storage';
import httpclient from '@czarsimon/httpclient';
import log from '@czarsimon/remotelogger';
import { Thunk, Dispatch, NewGameRequest, GameInfo } from "@src/types";
import { createApiUrl } from "../../service/api";
import { addGameInfo } from './actions';

export const createGame = (game: NewGameRequest, callback: () => void ): Thunk<void> => {
    return async (dispatch: Dispatch): Promise<void> => {
        const { body, error, status } = await httpclient.post<GameInfo>({
            url: createApiUrl("/gameservice/v1/games"),
            useAuth: true,
            body: game
        });

        if (!body) {
            log.error(`Something went wrong: ${error}`)
            return;
        }
        
        log.debug(`Creating new game: ${game.name}`);

        dispatch(addGameInfo(body));
        callback();
    };
};