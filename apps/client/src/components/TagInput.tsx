import { X } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { Input } from "./ui/input";


export function TagInput({value,onChange}:{
  value: string[];
  onChange: (tags: string[]) => void
}){
  // for the written input
  const [input,setInput] = useState<string>("")

  // add tag
  function addTag(tag:string){
    const newTag = tag.trim();
    if(newTag && value.includes(newTag)){
      alert("email already exist in the list");
    }
    if(newTag && !value.includes(newTag)){
      onChange([...value, newTag]);
      // set the input empty
      setInput("");
    }
  }

  // update the TagInput
  function updateTag(index:number,newtag:string){
    const newTags = [...value];
    newTags[index] = newtag;
    onChange(newTags);
  }

  // remove the tag
  function removeTag(index:number){
    const tags = value.filter((_, i) => i !== index);
    onChange(tags);
  }

  // for creating a new Tag
  function handleKeyDown(e:KeyboardEvent<HTMLInputElement>){
    if(e.key === "Enter" || e.key === ","){
      e.preventDefault();
      addTag(input);
    }
  }

  return (<>
    <div className="flex flex-wrap gap-2">
      {
        value.map((tag,index)=>(
          <span
            key={index}
            className="flex items-center bg-muted text-sm px-2 py-1 rounded-full">
              <div className="inline-block relative">
                  <span className="invisible whitespace-pre text-sm">
                    {tag || " "}
                  </span>
                  <input
                    className="absolute inset-0 outline-none border-none bg-transparent text-sm"
                    value={tag}
                    onChange={(e) => updateTag(index, e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
          </span>
        ))
      }
      <Input
        className="border-none shadow-none p-0 w-auto flex-shrink"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>

  </>);
}
