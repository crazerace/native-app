import TranslatedTexts from './translatedTexts'


it('Can create translatedTexts initial state', function () {
    const translatedTexts = TranslatedTexts.create({
        loaded: false
    })
    expect(translatedTexts.loaded).toBe(false);
})

it('Can create translatedTexts ', function () {
    const translatedTexts = TranslatedTexts.create({
        loaded: true,
        data: {
            LOGIN_BUTTON: "Log in",
            REGISTER_BUTTON: "Sign up"
        }
    })

    expect(translatedTexts.loaded).toBe(true);
    expect(translatedTexts.data.get("LOGIN_BUTTON")).toBe("Log in")
    expect(translatedTexts.data.get("REGISTER_BUTTON")).toBe("Sign up")
    translatedTexts.updateData({ EXTRA_BUTTON: "Extra button" })
    expect(translatedTexts.data.get("EXTRA_BUTTON")).toBe("Extra button")
    expect(translatedTexts.data.get("REGISTER_BUTTON")).toBe("Sign up")
    expect(translatedTexts.data.get("LOGIN_BUTTON")).toBe("Log in")

})


