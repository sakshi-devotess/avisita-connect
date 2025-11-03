import Toast from "react-native-toast-message";

export const keyExists = (obj: any, key: any) => {
  if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
    return false;
  } else if (obj.hasOwnProperty(key)) {
    return true;
  } else if (Array.isArray(obj)) {
    for (const element of obj) {
      const result: any = keyExists(element, key);
      if (result) {
        return result;
      }
    }
  } else {
    for (const k in obj) {
      const result: any = keyExists(obj[k], key);
      if (result) {
        return result;
      }
    }
  }

  return false;
};

export const capitalizeFirstLetter = (string: any) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const dateTemplate = (timestamp: string) => {
  const date = timestamp ? new Date(Number(timestamp)) : new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return ` ${hours}:${minutes}`;
};

export const dateFormatTemplate = (timestamp?: number | string | null) => {
  if (!timestamp) return "";

  const date = new Date(Number(timestamp));
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const year = String(date.getFullYear()).slice();

  return `${day}-${month}-${year}`;
};

export const assignLabels = (
  value: number | null | string,
  type: [{ label: string; value: number | string }]
) => {
  return type?.find((x: any) => x.value === value)?.label;
};

export const dateTimeTemplate = (options: any) => {
  const date = new Date(Number(options)).toLocaleString();
  return date;
};

export const showToast = (type: string, text1: string, text2 = "") => {
  Toast.show({
    type: type, // 'success', 'error', 'info', etc.
    text1: text1, // Main message
    text2: text2, // Sub-message (optional)
    visibilityTime: 2000,
    position: "bottom",
  });
};
