import React from 'react';

const PreviewGrid = ({ items, onItemClick }) => {
  return (
    <div className="preview-grid">
      {items.map((item, index) => (
        <div
          key={item?.id || index}
          className="preview-thumbnail"
          onClick={() => onItemClick(item)}
        >
          {item ? (
            <>
              <div className="preview-thumbnail__overlay">
                <div className="preview-thumbnail__title">{item.title}</div>
                <div className="preview-thumbnail__creator">{item.creator}</div>
              </div>
            </>
          ) : (
            <div className="preview-thumbnail__placeholder" />
          )}
        </div>
      ))}
    </div>
  );
};

export default PreviewGrid; 