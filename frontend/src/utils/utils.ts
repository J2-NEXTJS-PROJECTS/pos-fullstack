export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const isValidPage = (value: number) => {
  if (value == null) {
    return false;
  }

  if (typeof value !== "number" && isNaN(value)) {
    return false;
  }
  if (value <= 0) {
    return false;
  }

  if (!Number.isInteger(value)) {
    return false;
  }

  return true;
};

export const getImagePath = (image: string) => {
  const cloudinaryBaseUrl = `https://res.cloudinary.com`;
  if (image.startsWith(cloudinaryBaseUrl)) {
    return image;
  } else {
    //console.log(`en server ${process.env.API_URL}`)
    if (process.env.API_URL) {
      //! En server component se lee process.env.API_URL 
      //console.log(`API_URL: ${process.env.API_URL}/img/${image}`)
      return `${process.env.API_URL}/img/${image}`;
    }
    //! En client component se lee process.env.NEXT_PUBLIC_API_URL 
    //console.log(`NEXT_PUBLIC_API_URL ${process.env.NEXT_PUBLIC_API_URL}/img/${image}`)
    return `${process.env.NEXT_PUBLIC_API_URL}/img/${image}`;
  }
};


export const isAvailable=(inventory:number)=>inventory > 0