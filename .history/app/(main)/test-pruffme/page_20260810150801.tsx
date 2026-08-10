"use client"

import { useState } from "react"

export default function TestPruffme() {
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    async function test() {
        setLoading(true)
        setResult(null)

        try {
            const response = await fetch("/api/pruffme/test-participant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    webinarHash: "6a53d49612c4e2e12ed7eed67da924c7",
                    email: "tasha_kramerr@mail.ru",
                    name: "Наталья",
                    surname: "Соколова",
                }),
            })

            const data = await response.json()

            setResult({
                status: response.status,
                data,
            })

        } catch (error) {
            setResult({
                error: String(error),
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ padding: 40 }}>
            <h1>Тест Pruffme</h1>

            <button
                onClick={test}
                disabled={loading}
                style={{
                    padding: "10px 20px",
                    marginTop: 20,
                    cursor: "pointer",
                }}
            >
                {loading ? "Проверяем..." : "Проверить участника"}
            </button>

            {result && (
                <pre
                    style={{
                        marginTop: 30,
                        padding: 20,
                        background: "#f5f5f5",
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </div>
    )
}