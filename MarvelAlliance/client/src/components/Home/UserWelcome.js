import "./UserWelcome.css";


export const UserWelcome = ({ user }) => {

    return (
        <>
          <div className="greetingDiv">
            <h3 className="greeting" >Welcome, {user}!</h3>
          </div>
        </>
    );
};