export function FormLoader() {
    return (
        <div className="flex justify-center items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm1-13h-2v6h6v-2h-4z" />
            </svg>
            Logging In...
        </div>
    )
}