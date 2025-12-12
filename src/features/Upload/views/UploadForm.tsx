import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  uploadVideo,
  uploadVideoSchema,
} from "~/shared";
import type { UploadFormSchema } from "~/shared";

function UploadForm() {
  const form = useForm<UploadFormSchema>({
    resolver: zodResolver(uploadVideoSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
    },
  });

  function onSubmit({ title, file }: UploadFormSchema) {
    uploadVideo({ title, file }).then((result) => console.log(result));
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="replay-title">Replay Title</FieldLabel>
              <Input
                {...field}
                id="replay-title"
                aria-invalid={fieldState.invalid}
                placeholder="Jump into the void"
                autoComplete="off"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="file"
          control={form.control}
          render={({
            field: { value, onChange, ...fieldProps }, // eslint-disable-line @typescript-eslint/no-unused-vars
            fieldState,
          }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="replay-file">Replay File</FieldLabel>
              <Input
                {...fieldProps}
                id="replay-file"
                type="file"
                accept="video/*"
                aria-invalid={fieldState.invalid}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  onChange(file);
                }}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit">Upload</Button>
    </form>
  );
}

export { UploadForm };
