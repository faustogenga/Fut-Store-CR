import "../CSS/Modal.css";
import { RiCloseLine } from "react-icons/ri";

const ModalMessages = ({ item, messages, isVendor, isOpen, onClose }) => {
  //solo si el boton edit se apreta, se abre el modal.
  if (!isOpen) return null
  return (
    <>
      {/* DISPLAY DE MODAL */}
      <div className="overlay" />
      <div className="modalbox" style={{ backgroundColor: "white", width: "40vw", height: "70vh" }}>
        <button className={"closeBtn"} onClick={onClose}>
          <RiCloseLine style={{ marginBottom: "-3px" }} />
        </button>
        <div>
          <h5 className="rounded p-2 m-1" style={{ backgroundColor: "azure" }}>{isVendor? item.sender : item.vendor} 💬</h5>
        </div>
        <div className="rounded p-2" style={{ height: "80%", maxHeight: "500px", overflowY: "auto", backgroundColor: "#ebf8fa" }}>
          {
          
          messages.map((msm, index) => (
            isVendor ? (
              msm.sender !== item.sender ? (
                <span
                  key={index}
                  style={{ backgroundColor: "#d4ffff", width: "50%", overflow: "auto", whiteSpace: "break-spaces" }}
                  className="rounded m-2 p-1 d-flex justify-content-end float-end">
                  {msm.msm}
                </span>
              ) : (
                <div>
                  <div
                    key={index}
                    style={{ backgroundColor: "#c4ffce", width: "50%", overflow: "auto", whiteSpace: "break-spaces" }}
                    className="rounded m-2 p-1 d-flex justify-content-start float-start">
                    {msm.msm}
                  </div>
                  <br />
                </div>
              )
            ) : (
              msm.sender === item.sender ? (
                <span
                  key={index}
                  style={{ backgroundColor: "#d4ffff", width: "50%", overflow: "auto", whiteSpace: "break-spaces" }}
                  className="rounded m-2 p-1 d-flex justify-content-end float-end">
                  {msm.msm}
                </span>
              ) : (
                <div>
                  <div
                    key={index}
                    style={{ backgroundColor: "#c4ffce", width: "50%", overflow: "auto", whiteSpace: "break-spaces" }}
                    className="rounded m-2 p-1 d-flex justify-content-start float-start">
                    {msm.msm}
                  </div>
                  <br />
                </div>
              )
            )))}
        </div>
        <div>
          <h5 className="rounded p-2 m-1 text-center" style={{ backgroundColor: "azure" }}>Mensajes 👋</h5>
        </div>
      </div>

    </>
  );
};

export default ModalMessages;