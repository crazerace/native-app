import { types } from "mobx-state-tree";
import { makeGetRequest, createApiUrl, APIResponse } from "../service/api";

const initalState = {
    loaded: false,
    data: {}
}

interface TextMap {
    [key: string]: string;
}

const TranslatedTexts = types.model({
    loaded: types.boolean,
    data: types.map(types.string)
}).actions((self: any) => ({
    updateData(texts: TextMap) {
        for (let key in texts) {
            self.data.set(key, texts[key]);
        };
        self.loaded = true
    },
    fetchTexts() {
        const url: string = createApiUrl("/textservice/v1/texts/group/NATIVE_APP")
        makeGetRequest<TextMap>({ url, useAuth: false })
            .then((res: APIResponse) => {
                this.updateData(res.body)
                console.log(res)
            })
            .catch(console.log)
    }
}));

export default TranslatedTexts;