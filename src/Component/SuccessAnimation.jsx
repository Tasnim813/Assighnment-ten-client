import Lottie from "react-lottie-player";

export default function SuccessAnimation({ message = "Login Successful!" }) {
  return (
    <div className="flex flex-col justify-center items-center fixed inset-0 bg-white/80 backdrop-blur-sm z-50">
      <Lottie
        loop={false}
        play
        src="https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json"
        style={{ height: "250px", width: "250px" }}
      />
      <h2 className="mt-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700">
        {message}
      </h2>
    </div>
  );
}
