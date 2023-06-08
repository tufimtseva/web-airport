export const Footer = function() {
   return(
    <footer>
    <div className="container">
      <div className="row">
        <div className="contact-us">
          <h4>Contact Us</h4>
          <p>123 Main Street, Anytown USA, (555) 555-5555, <a href="mailto:info@sl.com">info@sl.com</a></p>
        </div>
        <div className="follow-us">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="#"><i>facebook</i></a></li>
            <li><a href="#"><i>instagram</i></a></li>
            <li><a href="#"><i>twitter</i></a></li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <p>&copy; 2023 Silver Lining. All Rights Reserved.</p>
        </div>
      </div>
    </div>
    
  </footer>
   )
}