const PRUFFME_API = "https://pruffme.com/api/"

const USER_HASH = process.env.PRUFFME_USER_HASH as string
const SECRET_HASH = process.env.PRUFFME_SECRET_HASH as string

if (!USER_HASH || !SECRET_HASH) {
    throw new Error(
        "PRUFFME_USER_HASH или PRUFFME_SECRET_HASH не заданы"
    )
}

export async function pruffmeRequest(
    action: string,
    content: Record<string, any> = {}
) {
    const encodedContent = Buffer
        .from(JSON.stringify(content))
        .toString("base64")

    const body = new URLSearchParams({
        user: USER_HASH,
        key: SECRET_HASH,
        action,
        content: encodedContent,
    })

    const response = await fetch(PRUFFME_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
        cache: "no-store",
    })

    if (!response.ok) {
        throw new Error(
            `Pruffme API HTTP error: ${response.status}`
        )
    }

    const data = await response.json()

    return data
}