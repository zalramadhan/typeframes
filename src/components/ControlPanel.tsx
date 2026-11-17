import type { ReactNode } from 'react';
import {
  EASING_OPTIONS,
  FONT_OPTIONS,
  TYPE_CONTROLS,
  TIMING_CONTROLS,
} from '../lib/constants';
import type { ParamControl, Params } from '../effects/types';

type Props = {
  params: Params;
  extraParams: ParamControl[];
  onChange: (patch: Partial<Params>) => void;
};

function Group({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-line px-5 py-5">
      <h4 className="mb-4 text-[10px] uppercase tracking-[0.18em] text-muted">
        {title}
      </h4>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Label({
  children,
  value,
}: {
  children: ReactNode;
  value?: string;
}) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <span className="text-xs text-ink">{children}</span>
      {value ? (
        <span className="font-mono text-[11px] tabular-nums text-muted">
          {value}
        </span>
      ) : null}
    </div>
  );
}

function Range({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <Label value={`${value}${unit ?? ''}`}>{label}</Label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={`${value}${unit ?? ''}`}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none border border-line bg-surface2 px-3 py-2 text-xs text-ink outline-none transition-colors hover:border-muted"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Color({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="text-xs text-ink">{label}</span>
      <span className="flex items-center gap-2">
        <span className="font-mono text-[11px] uppercase text-muted">
          {value}
        </span>
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={`${label} hex value`}
        />
      </span>
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3">
      <span className="text-xs text-ink">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 border transition-colors ${
          checked ? 'border-ink bg-ink' : 'border-line bg-surface2'
        }`}
      >
        <span
          className={`absolute top-[2px] h-[14px] w-[14px] transition-transform ${
            checked
              ? 'translate-x-[18px] bg-bg'
              : 'translate-x-[2px] bg-muted'
          }`}
        />
      </button>
    </label>
  );
}

function Control({
  control,
  params,
  onChange,
}: {
  control: ParamControl;
  params: Params;
  onChange: (patch: Partial<Params>) => void;
}) {
  if (control.kind === 'range') {
    return (
      <Range
        label={control.label}
        value={Number(params[control.key] ?? control.default)}
        min={control.min}
        max={control.max}
        step={control.step}
        unit={control.unit}
        onChange={(value) => onChange({ [control.key]: value })}
      />
    );
  }
  if (control.kind === 'select') {
    return (
      <Select
        label={control.label}
        value={String(params[control.key] ?? control.default)}
        options={control.options}
        onChange={(value) => onChange({ [control.key]: value })}
      />
    );
  }
  if (control.kind === 'toggle') {
    return (
      <Toggle
        label={control.label}
        checked={Boolean(params[control.key] ?? control.default)}
        onChange={(value) => onChange({ [control.key]: value })}
      />
    );
  }
  return (
    <Color
      label={control.label}
      value={String(params[control.key] ?? control.default)}
      onChange={(value) => onChange({ [control.key]: value })}
    />
  );
}

export default function ControlPanel({ params, extraParams, onChange }: Props) {
  return (
    <div>
      <Group title="Timing">
        {TIMING_CONTROLS.map((control) => (
          <Control
            key={control.key}
            control={control}
            params={params}
            onChange={onChange}
          />
        ))}
        <Select
          label="Easing"
          value={params.easing}
          options={EASING_OPTIONS}
          onChange={(value) => onChange({ easing: value as Params['easing'] })}
        />
      </Group>

      <Group title="Type">
        <Select
          label="Font"
          value={params.fontFamily}
          options={FONT_OPTIONS}
          onChange={(value) =>
            onChange({ fontFamily: value as Params['fontFamily'] })
          }
        />
        {TYPE_CONTROLS.map((control) => (
          <Control
            key={control.key}
            control={control}
            params={params}
            onChange={onChange}
          />
        ))}
      </Group>

      <Group title="Color">
        <Color
          label="Text color"
          value={params.color}
          onChange={(value) => onChange({ color: value })}
        />
      </Group>

      {extraParams.length > 0 ? (
        <Group title="Effect">
          {extraParams.map((control) => (
            <Control
              key={control.key}
              control={control}
              params={params}
              onChange={onChange}
            />
          ))}
        </Group>
      ) : null}
    </div>
  );
}
