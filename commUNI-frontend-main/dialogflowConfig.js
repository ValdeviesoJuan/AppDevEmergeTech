import { Dialogflow_V2 } from "react-native-dialogflow";

export const initDialogflow = () => {
    const privateKey = `-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvs09EiSrBfvFJ\necedIhTWLhp+bP7VKeVN35QxflgV7S1wY0NjcSwSGAcWG6qULj5oI8Tu9U/TReGd\n3AvJjDQ8YR54CGP55P3u/GQV7PwnI0YM5lZ8VM4wOmdMINjiPzc40auUlZL8XBKn\nP3v/qwp9b//0s+1p5vkzQfs/00S9jvD5ipfvnNPZs3ttA0NkpqxvH5AiJ8dAsQR/\n2KB+7bKEX9kE61qJdGR++CheY9opVgSFpPajDR7ONg/7PcnzVo4l+F/Xf7fOSe4x\nfedwyOiuFMJwHw5ZUW43lO9bNiQEZ/dep+eh9YyrLQ1alcZnpTdL/sHMOws0XiDN\n0zBEHgQlAgMBAAECggEACjiJBTCMiUPi8euwvMI+348VhqK9DUtEtgEVAW8Qh+VW\nS29+0VID/AvOnQ7gH1ge/xcLmFIIF38nxt4w3QPisFt+9qvC8xvK2Nmbpznew5Zr\nTLSj4H4yHhSbreOgR5hhVD/ANo0f8ehs7l1EpO9p1WO2n6Ei5RJPugIIhWKQdmK5\nhzSfIO8PotLNUstTx/BsbHxNDu/HfmnhonhM0KFAhM9oc2sS16dI1ToGMmGUsVUd\nJqB9YnEUkeC+2FQ/dPFf9VbvU2JP2MC9xVsnHinXbUjBb/m6cPPa2GzafPXYtHDL\n1gCHFZLpQfeaw1WTWOXfn63WanMx1RNZ4jPSNsfqSQKBgQDx0AoT90YHgOiHdvOc\nRRzTpyrk0mTzQTIX26XaHgZe5fFEhlrphFs3SkZI54fIYKbgDeiymZbMAab6A66t\ntPbqaUo49T/j1BNdi8iP7koLUJF9JjryJRRhQtMracuDhZLMGJeNxfOjKsMXVfnw\nhOxjsedNa84w+Y19HtHEbufWCQKBgQC6AkhUGa1PN4IAo+k3VfXPKZkCAeJ7e5FM\nLpo4obWIAIqkWmzbfebu6cb9pgY9W7bcMCJJZvyAz2Q/Hmdx+ulNPBX+CSiVpzYI\nJjKQt1yBnr85tlkUAV1KREakb0arMpcsA8H+VvUl+MyID10Ii7XDpRhwTOk3Qftm\nNfBdikDkPQKBgQCXNyjGOZDCant/EwTeiV2wgc5SD7vvXqrLvqClmLcVKyhIWNiL\nRSihl8ICHz+LL93LKQeGgIOLidD4ccsPd6YdCsDOg5dzipCdpCdE0pfdIYIJyBl+\niW+ILvjNIjiRQ7t8BDjqAIsOU1RyyGInZYhKA9uIT80+VSCEyPwWoeA6uQKBgQCk\nZVQLkE4OT17Ethlu4LhJidhDX+sNe96k2CNRngpU0zW1oH3JV/L8gP1wPIYTQLXS\n0W/cM/tC1Qkih/qhUENWEZ7WUL3f1lL4zNmv8X7+yJD1ruX3umT7OHC+7+IjeKkH\nK6MO6UftcYFDV2DAJspUydtZlYAhaF2Krm1sHr7PeQKBgCEoU+0sND+yGj7kTw55\nbV/yJ48dYdypt3uUbkavPnvGAX1hu8xI2bbucL6/mBQ237IY5+t5p0gx+saAYaDb\nmdXAqt6C6MSRtiWGPCQztvh8BvkNP/yhdasGm20Wsgcgv/SUa6MCCwPUAcdgTScm\nf05dWo4Z0Jx71sjS2MngRMip\n-----END PRIVATE KEY-----\n`;
    
    Dialogflow_V2.setConfiguration(
        "chatbotserviceacc@communichatbotproject.iam.gserviceaccount.com",  
        privateKey,
        Dialogflow_V2.LANG_ENGLISH,
        "communichatbotproject"
    );
};