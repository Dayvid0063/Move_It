import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel } from "@/components/ui/form";

const CarFeaturesInput = ({
  value = [],
  onChange
}: {
  value?: string[],
  onChange: (features: string[]) => void
}) => {
  const [currentFeature, setCurrentFeature] = useState('');

  const addFeature = () => {
    if (currentFeature.trim() && !value.includes(currentFeature.trim())) {
      onChange([...value, currentFeature.trim()]);
      setCurrentFeature('');
    }
  };

  const removeFeature = (featureToRemove: string) => {
    onChange(value.filter(feature => feature !== featureToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFeature();
    }
  };

  return (
    <FormItem>
      <FormLabel>Car Features</FormLabel>
      <div className="space-y-2">
        <div className="flex space-x-2">
          <Input
            placeholder="Add a feature (e.g., AC, Leather Seats)"
            value={currentFeature}
            onChange={(e) => setCurrentFeature(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={addFeature}
            aria-label="Add feature"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {value.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {value.map((feature) => (
              <div
                key={feature}
                className="flex items-center bg-gray-100 rounded-full pl-3 pr-1 py-1 text-sm"
              >
                {feature}
                <button
                  type="button"
                  onClick={() => removeFeature(feature)}
                  className="ml-2 hover:bg-gray-200 rounded-full p-1"
                  aria-label={`Remove feature ${feature}`}
                >
                  <X className="h-3 w-3 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </FormItem>
  );
};

export default CarFeaturesInput;
