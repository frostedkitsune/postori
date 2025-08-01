import crashJPEG from "@/assets/tj-crash.png"

function ErrorFallback() {
  return (
    <div className="w-full h-full grid place-items-center ">
      <div>
        <center>
          <img src={crashJPEG} className="w-52" alt="tom and jerry crashed on a wall" />
        </center>
        <pre className="bg-red-200 text-red-800 px-4 py-2 -mt-4 rounded">
          Err: Something went wrong. Check console for more details.
        </pre>
      </div>
    </div>
  )
}

function logError(error: Error, info: React.ErrorInfo) {
  console.error(error);
  console.error(info);
};

export {
  ErrorFallback as default,
  logError
}
