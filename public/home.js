function Home(){
  const ctx = React.useContext(UserContext);
  let i = ctx.user.length - 1;
  const account = ctx.user[i];
  // if(ctx.user[i]) {
    console.log(ctx.user)
  // }
  const header  = `current user: ${account.email}`
  
  return (
    <div id="home" className="home-background">
      <div className="card brand-centered brand-margin-top">
        <Card
          className="card mb-3"
          maxWidth="40rem"
          txtcolor="black"
          header="BadBank Three Tier Capstone"
          title="Welcome to BadBank"
          text="Bringing inovation to banking with the latest and greatest technology."
          body={
            <img src="images/badbank5.jpeg" className="img-fluid" alt="Logo" width="1000px"/>
          }
        />
    </div>
    </div>
  );  
}
