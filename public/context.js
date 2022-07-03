const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);

function Card(props) {
  function classes(){
    const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
    return 'card mb-3 ' + bg + txt;
  }

  return (
    <div className={props.className} style={{ maxWidth: props.maxWidth }}>
      <div className="card-header brand-background">{props.header}</div>
      <div className="card-body">
        {props.title && <h3 className="card-title">{props.title}</h3>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && props.successFlag ? <div style={{color:'#000fff'}} id="createStatus"><br />{props.status}</div>:<div style={{color:'red'}} id="createStatus"><br />{props.status}</div>}
      </div>
    </div>
  );
}

