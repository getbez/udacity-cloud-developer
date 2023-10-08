
function MissingPeopleUploadForm(props) {
   
    console.log('filteredImage', props.filteredImage) 
    // const imageSrc='data:image/jpeg;base64,'+Buffer.from(props.filteredImage, 'binary').toString('base64');
    return (
      <div>
        <form className="form" onSubmit={props.getFilteredImage}>
          <div className="input-group">
            <label htmlFor="imageUrl">Please provide a publicly accessible image url you want to filter</label><br/>
            <input type="url" name="imageUrl"/>
          </div>
          <br/>
          <button className="primary">Submit</button>
        </form>
        {       
        props.uploadSuccess ? 
            <div> 
                <label style={{color: 'green'}}>image upload succeeded</label>
                <br/>
                <h3>Filtered image</h3>
                <img src={props.filteredImage} alt="filtered"/>
            </div> : 
            <div></div>
        }

        <br/>
        <button className="primary" onClick={props.handleLogout}>Logout</button>  
      </div>
      
    );
  }
  
  export default MissingPeopleUploadForm