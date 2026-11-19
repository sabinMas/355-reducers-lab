import {PRESETS} from "./presets.js";

export const initialEditor = {
  photo: "fjord",
  preset: "original",
  brightness: 100,
  contrast: 100,
  saturation: 100,
  sepia: 0,
  rotation: 0,
  flipped: false,
};

export function editorReducer(editor, action) {
  switch (action.type) {
    case "slider_moved":
      return { ...editor, [action.name]: action.value, preset:"custom" };

    case "preset_chosen":
      return {...editor, ...PRESETS[action.preset], preset: action.preset };

    case "rotated_left":
      return {
        ...editor,
        rotation: editor.rotation === 0 ? 270 : editor.rotation - 90,
      };
      
    case "rotated_right":
      return{
        ...editor,
        rotation: editor.rotation === 0 ? 270: editor.rotation + 90,
      };

    // case "edits_reset":
    //   editor.preset = "original";
    //   editor.brightness = 100;
    //   editor.contrast = 100;
    //   editor.saturation = 100;
    //   editor.sepia = 0;
    //   editor.rotation = 0;
    //   editor.flipped = false;
    //   return editor;
    case "edits_reset":
      return{...initialEditor, photo: editor.photo};
      
    case "flip_toggled":
      return{...editor, flipped: !editor.flipped};

    case "photo_chosen":
      return{...initialEditor, photo: action.photo};

    case "straightened":
      return{...editor, rotation: 0, flipped: false};

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
