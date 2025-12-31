import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Textarea,
  uploadVideoSchema,
  useUploadVideo,
} from "~/shared";
import type { UploadFormSchema } from "~/shared";

function UploadForm() {
  const uploadMutation = useUploadVideo();
  const form = useForm<UploadFormSchema>({
    resolver: zodResolver(uploadVideoSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(data: UploadFormSchema) {
    uploadMutation.mutate(data);
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
                placeholder="Epic race"
                autoComplete="off"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({
            field: { value, onChange, ...fieldProps }, // eslint-disable-line @typescript-eslint/no-unused-vars
            fieldState,
          }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description-file">Description</FieldLabel>
              <Textarea
                {...fieldProps}
                id="description-file"
                aria-invalid={fieldState.invalid}
                placeholder="Epic raced played vs my friend"
                autoComplete="off"
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

        <Controller
          name="thumbnail"
          control={form.control}
          render={({
            field: { value, onChange, ...fieldProps }, // eslint-disable-line @typescript-eslint/no-unused-vars
            fieldState,
          }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="thumbnail-file">Thumbnail File</FieldLabel>
              <Input
                {...fieldProps}
                id="thumbnail-file"
                type="file"
                accept="image/*"
                aria-invalid={fieldState.invalid}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  onChange(file);
                }}
              />
              <FieldDescription>
                The thumbnail that will be displayed. If not provided, a
                thumbnail will be generated from the video frame.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" disabled={uploadMutation.isPending}>
        {uploadMutation.isPending ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
}

export { UploadForm };
