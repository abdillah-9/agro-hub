import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const footerStyles = `
  .footer-section {
    background-color: #1f2937;
    color: white;
    padding: 3rem 1rem;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-article {
    margin-bottom: 1.5rem;
  }

  .footer-article h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .footer-article p {
    font-size: 0.9rem;
    color: #d1d5db;
    line-height: 1.5;
  }

  .footer-article ul {
    list-style: none;
    padding: 0;
  }

  .footer-article ul li {
    margin-bottom: 0.5rem;
  }

  .footer-article ul li a {
    color: #d1d5db;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s;
  }

  .footer-article ul li a:hover {
    color: white;
  }

  .icon {
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }

  .staff-login-link {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    margin-top: 1rem;
    transition: background-color 0.3s;
  }

  .staff-login-link:hover {
    background-color: #45a049;
  }

  @media (min-width: 640px) {
    .footer-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .footer-container {
      grid-template-columns: repeat(4, 1fr);
    }

    .footer-article h2 {
      font-size: 1.25rem;
    }

    .footer-article p, .footer-article ul li a {
      font-size: 0.875rem;
    }
  }
`;

function Footer() {
  return (
    <>
      <style>{footerStyles}</style>
      <section className="footer-section">
        <footer className="footer-container">
          <article className="footer-article">
            <h2>Agro-hub</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non doloribus quisquam eius?
            </p>
          </article>
          <article className="footer-article">
            <h2>Useful Links</h2>
            <ul>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faArrowRight} className="icon" />
                  Blog
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faArrowRight} className="icon" />
                  News
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faArrowRight} className="icon" />
                  Farmer's Kit
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faArrowRight} className="icon" />
                  Our Team
                </a>
              </li>
            </ul>
          </article>
          <article className="footer-article">
            <h2>Our Services</h2>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Hire</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </article>
          <article className="footer-article">
            <h2>Staff Login</h2>
            <p>
              This feature is Available only for Staff or Administrator
            </p>
            <Link to="/SignIn" className="staff-login-link">
              Click Here
            </Link>
          </article>
        </footer>
      </section>
    </>
  );
}

export default Footer;