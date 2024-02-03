/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
type As = React.ElementType;

/**
 * Extract the props of a React element or component
 */
type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never,
> = Omit<
  Target,
  'transition' | 'as' | 'color' | 'translate' | OmitAdditionalProps
> & {
  htmlTranslate?: 'yes' | 'no' | undefined;
};

type RightJoinProps<
  SourceProps extends object = {},
  OverrideProps extends object = {},
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

type Assign<T, U> = Omit<T, keyof U> & U;

type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends As = As,
> = (
  | RightJoinProps<ComponentProps, AdditionalProps>
  | RightJoinProps<AsProps, AdditionalProps>
) & {
  as?: AsComponent;
};

interface ComponentWithAs<Component extends As, Props extends object = {}> {
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      React.ComponentProps<Component>,
      React.ComponentProps<AsComponent>,
      Props,
      AsComponent
    >,
  ): JSX.Element;

  displayName?: string;
  propTypes?: React.WeakValidationMap<any>;
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<any>;
  id?: string;
}

export type {
  As,
  PropsOf,
  RightJoinProps,
  ComponentWithAs,
  Assign,
  MergeWithAs,
  OmitCommonProps,
};
