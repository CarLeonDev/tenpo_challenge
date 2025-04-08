import { useMeasure } from "@/hooks/useMesure";
import { cn } from "@/lib/utils";
import React from "react";

type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  fullHeight?: boolean;
};

export const Table = React.forwardRef<HTMLTableElement, TableProps>(({ children, fullHeight = false, ...props }, ref) => {
  const [containerRef, { height }] = useMeasure<HTMLDivElement>();

  return (
    <div ref={containerRef} {...props} className={cn("flex flex-1 self-stretch justify-center items-center", props.className)}>
      <table
        ref={ref}
        className="grid overflow-auto relative border border-card-border rounded-md auto-rows-min w-full"
        style={{ height: fullHeight ? height : 'auto' }}
        {...props}
      >
        {children}
      </table>
    </div>
  );
});

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.TableHTMLAttributes<HTMLTableSectionElement>>(({ children, ...props }, ref) => {
  return (
    <thead ref={ref} {...props} className={cn("grid sticky top-0 z-10 row-start-1 row-auto-start", props.className)}>
      {children}
    </thead>
  );
});

export const TableHeaderRow = React.forwardRef<HTMLTableRowElement, React.TableHTMLAttributes<HTMLTableRowElement>>(({ children, ...props }, ref) => {
  return (
    <tr ref={ref} {...props} className={cn("flex w-full bg-sidebar border-b border-card-border", props.className)}>
      {children}
    </tr>
  );
});

export const TableHeaderCell = React.forwardRef<HTMLTableCellElement, React.TableHTMLAttributes<HTMLTableCellElement>>(({ children, ...props }, ref) => {
  return (
    <th ref={ref} {...props} className={cn("flex p-2 text-sm font-medium border-r last:border-r-0 border-card-200", props.className)}>
      {children}
    </th>
  );
});

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.TableHTMLAttributes<HTMLTableSectionElement>>(({ children, ...props }, ref) => {
  return (
    <tbody ref={ref} {...props} className={cn("grid relative", props.className)}>
      {children}
    </tbody>
  );
});

export const TableRow = React.forwardRef<HTMLTableRowElement, React.TableHTMLAttributes<HTMLTableRowElement>>(({ children, ...props }, ref) => {
  return (
    <tr ref={ref} {...props} className={cn("flex absolute w-full border-b last:border-b-0 border-card-200", props.className)}>
      {children}
    </tr>
  );
});

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TableHTMLAttributes<HTMLTableCellElement>>(({ children, ...props }, ref) => {
  return (
    <td
      ref={ref}
      {...props}
      className={cn("flex p-2 text-sm text-card-foreground border-r last:border-r-0 border-card-200", props.className)}
    >
      {children}
    </td>
  );
});