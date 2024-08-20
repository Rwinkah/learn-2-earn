import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { FormControl, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
const DynamicInput = ({ control, name, placeholder }: any) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	return (
		<div>
			{fields.map((item, index) => (
				<div key={item.id}>
					<Controller
						control={control}
						name={`${name}[${index}].value`}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<input
										className="m-0 border-solid bg-transparent border-[#66666666] border-[1px]"
										placeholder={placeholder}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button
						type="button"
						onClick={() => remove(index)}
						className="mt-2 max-w-[200px] bg-red-500 text-white rounded">
						Remove
					</Button>
				</div>
			))}
			<Button
				type="button"
				onClick={() => append({ value: "" })}
				className="mt-4 max-w-[200px] bg-green-500 text-white rounded">
				Add
			</Button>
		</div>
	);
};

export default DynamicInput;
