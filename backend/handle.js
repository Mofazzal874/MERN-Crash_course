const handle = (req, res) => {
    // Access shared config from app
    const config = req.app.get('myConfig');
  
    console.log(`Modular system check: ${config.appName} by ${config.author}`);
    
    res.send(`Welcome to ${config.appName} (v${config.version})`);
  };
  
  export default handle;
  