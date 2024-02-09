import React, { useState, ChangeEvent, FormEvent } from 'react';

interface TagInputProps {
    onTagsChange: (tags: string[]) => void;
  }
const TagInput: React.FC<TagInputProps> = ({onTagsChange}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');

  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
  };

  const handleAddTag = (event: FormEvent) => {
    event.preventDefault();
    
    if (newTag.trim() !== '' && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      onTagsChange([...tags, newTag])
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <>
      <form onSubmit={handleAddTag}>
        <input
          id="tag-input"
          type="text"
          placeholder="Enter a tag"
          value={newTag}
          onChange={handleTagChange}
        />
        <button type="submit">Add Tag</button>
      </form>
      <div className="tags">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
            <button className="remove-tag" onClick={() => handleRemoveTag(tag)}>
              x
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default TagInput;
