# React Hook Form

### Need:
When building forms in React, we often have to:
- Manage input values with useState.
- Write validation logic for each field.
- Handle errors manually.
- Re-render the whole form every time an input changes.

```javascript
import React, { useState } from "react";

function ManualForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    let newErrors = {};
    if (!name) {
      newErrors.name = "Name is required.";
    }
    if (!email.includes("@")) {
      newErrors.email = "Email must include '@'.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Form submitted:", { name, email });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default ManualForm;
```

### React Hook Form simplifies this by:
- Automatically managing inputs without needing useState.
- Providing built-in validation rules and error handling.
- Optimizing performance by minimizing unnecessary re-renders.

```javascript
import React from "react";
import { useForm } from "react-hook-form";

function HookForm() {
  // Initializing useForm
  const { 
    register, // Used to connect inputs to React Hook Form
    handleSubmit, // Used to handle form submission
    formState: { errors } // Contains error messages for validation
  } = useForm();

  // Function to run on form submission
  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        {/* Register connects this input to React Hook Form and adds validation */}
        <input 
          {...register("name", { required: "Name is required." })}
        />
        {/* Display error if name validation fails */}
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input 
          {...register("email", { 
            required: "Email is required.",
            pattern: {
              value: /^\S+@\S+$/,
              message: "Email must include '@'."
            }
          })}
        />
        {/* Display error if email validation fails */}
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default HookForm;
```
### Key Difference

| Feature | Manual Form | React Hook Form |
|---------|-------------|-----------------|
|Input Handling | `useState` for each input | `register` for automatic binding |
| Validation | Written manually | Defined directly in register|
| Error Handling | Custom error logic | errors object from formState |
| Code Complexity | High | Low |


----

# Zod

Zod is a TypeScript-first schema declaration and validation library. It allows you to define schemas for your form inputs, ensuring type safety and clear validation rules.

When used with React Hook Form:
- Zod handles validation logic, so you don’t need to write repetitive validation rules in the `register` function.
- React Hook Form integrates with Zod seamlessly using the `zodResolver`.

```typescript
import React from "react";
import { useForm } from "react-hook-form";

function FormWithoutZod() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input
          {...register("name", { required: "Name is required." })}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^\S+@\S+$/,
              message: "Invalid email format.",
            },
          })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormWithoutZod;
```

### Form with Zod

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(1, "Name is required."), // Minimum length 1
  email: z.string().email("Invalid email format."), // Must be a valid email
});

function FormWithZod() {
  // Initialize useForm with the Zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema), // Connect Zod validation
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input
          {...register("name")}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          {...register("email")}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormWithZod;
```

| Feature | Without Zod | With Zod |
|---------| ------------|----------|
| Validation Logic | Defined in register for each field | Centralized in a Zod schema |
| Reusability of Validation | Not reusable | Schema can be reused across forms |
| Error Messages | Defined inline in each input | Defined in the schema |
| Code Complexity | Higher due to inline validation | Lower and cleaner