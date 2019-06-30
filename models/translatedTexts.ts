import { types } from 'mobx-state-tree'
import { makeGetRequest, createApiUrl, APIResponse, APIError } from '../service/api';

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
}).actions(self => ({
    updateData(texts: TextMap) {
        for (let key in texts) {
            self.data.set(key, texts[key]);
        };
        self.loaded = true
    },
    fetchTexts() {
        const url: string = createApiUrl("/textservice/v1/texts/group/NATIVE_APP")
        makeGetRequest({ url, useAuth: false })
            .then((res: APIResponse) => {
                this.updateData(res.response)
                console.log(res)
            })
            .catch(console.log)
    }
}));

export default TranslatedTexts;