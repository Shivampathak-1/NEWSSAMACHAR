import React from 'react';
import './Newsitem.css';

const Newsitem = ({ title, description, imageURL, newsURL, author, date }) => {
  // Log props to ensure they are being passed correctly
//   console.log({ title, description, imageURL, newsURL, author, date });

  return (
    <div>
      <div className="card shadow custom-zoom rounded-5">
        <img
          src={imageURL ? imageURL : "https://wallpapercave.com/wp/wp4094532.jpg"}
          className="card-img-top rounded-top-5"
          alt={title ? title : "News Image"}
          style={{ maxHeight: '175px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-danger">
              By {author ? author : "Unknown"} at {date ? new Date(date).toUTCString() : "Date unavailable"}
            </small>
          </p>
          <a
            href={newsURL}
            target='_blank'
            rel='noreferrer'
            className="btn btn-sm btn-dark custom-zoom"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsitem;
